
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";
import MainLayout from "@/components/Layout/MainLayout";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Define the character data structure
interface CharacterData {
  background: string;
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  skills: string[];
  inventory: string[];
}

// Instead of extending the database type, define a separate interface
interface CharacterSheetType {
  id: string;
  name: string;
  system: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  character_data: Json;
}

const CharacterEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, username } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [character, setCharacter] = useState<CharacterSheetType | null>(null);
  const [availableSkills, setAvailableSkills] = useState<string[]>([
    "Acrobatics",
    "Animal Handling",
    "Arcana",
    "Athletics",
    "Deception",
    "History",
    "Insight",
    "Intimidation",
    "Investigation",
    "Medicine",
    "Nature",
    "Perception",
    "Performance",
    "Persuasion",
    "Religion",
    "Sleight of Hand",
    "Stealth",
    "Survival",
  ]);

  // Parsed character data with proper typing
  const [characterData, setCharacterData] = useState<CharacterData>({
    background: "",
    stats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    skills: [],
    inventory: [],
  });

  // Form fields
  const [name, setName] = useState<string>("");
  const [system, setSystem] = useState<string>("Custom");
  const [background, setBackground] = useState<string>("");
  const [newItem, setNewItem] = useState<string>("");

  // Fetch character data
  useEffect(() => {
    const fetchCharacter = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("character_sheets")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setCharacter(data);
          setName(data.name);
          setSystem(data.system);

          // Parse the character_data safely
          try {
            let parsedData: CharacterData;
            
            if (typeof data.character_data === 'string') {
              parsedData = JSON.parse(data.character_data);
            } else {
              parsedData = data.character_data as unknown as CharacterData;
            }
            
            // Ensure all required fields exist with defaults if needed
            const safeData: CharacterData = {
              background: parsedData.background || "",
              stats: {
                strength: parsedData.stats?.strength || 10,
                dexterity: parsedData.stats?.dexterity || 10,
                constitution: parsedData.stats?.constitution || 10,
                intelligence: parsedData.stats?.intelligence || 10,
                wisdom: parsedData.stats?.wisdom || 10,
                charisma: parsedData.stats?.charisma || 10,
              },
              skills: parsedData.skills || [],
              inventory: parsedData.inventory || [],
            };
            
            setCharacterData(safeData);
            setBackground(safeData.background);
          } catch (parseError) {
            console.error("Error parsing character data:", parseError);
            toast.error("Error loading character data. Using defaults.");
          }
        }
      } catch (error) {
        console.error("Error fetching character:", error);
        toast.error("Failed to load character");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  const handleStatChange = (stat: keyof typeof characterData.stats, value: string) => {
    const numValue = parseInt(value) || 0;
    setCharacterData({
      ...characterData,
      stats: {
        ...characterData.stats,
        [stat]: numValue,
      },
    });
  };

  const handleAddInventoryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim()) {
      setCharacterData({
        ...characterData,
        inventory: [...characterData.inventory, newItem.trim()],
      });
      setNewItem("");
    }
  };

  const handleRemoveInventoryItem = (index: number) => {
    const newInventory = [...characterData.inventory];
    newInventory.splice(index, 1);
    setCharacterData({
      ...characterData,
      inventory: newInventory,
    });
  };

  const handleSkillToggle = (skill: string, checked: boolean) => {
    if (checked) {
      setCharacterData({
        ...characterData,
        skills: [...characterData.skills, skill],
      });
    } else {
      setCharacterData({
        ...characterData,
        skills: characterData.skills.filter(s => s !== skill),
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      
      const updatedCharacterData = {
        ...characterData,
        background: background,
      };
      
      if (id) {
        // Update existing character
        const { error } = await supabase
          .from("character_sheets")
          .update({
            name: name,
            system: system,
            character_data: updatedCharacterData as unknown as Json,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id);

        if (error) throw error;
        toast.success("Character updated successfully");
      } else {
        // Create new character
        const { error } = await supabase.from("character_sheets").insert({
          name: name,
          system: system,
          character_data: updatedCharacterData as unknown as Json,
          user_id: "commander", // Using fixed ID for demo
        });

        if (error) throw error;
        toast.success("Character created successfully");
      }

      navigate("/characters");
    } catch (error) {
      console.error("Error saving character:", error);
      toast.error("Failed to save character");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="vesper-header text-2xl mb-6">
          {id ? "Edit Character" : "Create New Character"}
        </h1>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="vesper-header text-sm block mb-1">
                  CHARACTER NAME
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="vesper-input"
                />
              </div>

              <div>
                <label htmlFor="system" className="vesper-header text-sm block mb-1">
                  SYSTEM
                </label>
                <Input
                  id="system"
                  value={system}
                  onChange={(e) => setSystem(e.target.value)}
                  required
                  className="vesper-input"
                />
              </div>

              <div>
                <label htmlFor="background" className="vesper-header text-sm block mb-1">
                  BACKGROUND
                </label>
                <Textarea
                  id="background"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="vesper-input min-h-[120px]"
                />
              </div>

              <div>
                <h3 className="vesper-header text-sm mb-2">STATS</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(characterData.stats).map(([stat, value]) => (
                    <div key={stat}>
                      <label htmlFor={stat} className="block text-sm mb-1 capitalize">
                        {stat}
                      </label>
                      <Input
                        id={stat}
                        type="number"
                        value={value}
                        onChange={(e) => handleStatChange(stat as keyof typeof characterData.stats, e.target.value)}
                        className="vesper-input"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="vesper-header text-sm mb-2">SKILLS</h3>
                <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-2 vesper-panel">
                  {availableSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`skill-${skill}`}
                        checked={characterData.skills.includes(skill)}
                        onCheckedChange={(checked: boolean) => handleSkillToggle(skill, checked)}
                      />
                      <label 
                        htmlFor={`skill-${skill}`}
                        className="text-sm cursor-pointer"
                      >
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="vesper-header text-sm mb-2">INVENTORY</h3>
                <div className="vesper-panel p-2 max-h-[200px] overflow-y-auto mb-2">
                  {characterData.inventory.length > 0 ? (
                    <ul className="space-y-1">
                      {characterData.inventory.map((item, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <span>{item}</span>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveInventoryItem(index)}
                            className="h-6 px-2"
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">No items in inventory</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add new item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    className="vesper-input"
                  />
                  <Button type="button" onClick={handleAddInventoryItem}>
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/characters")}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Character"}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default CharacterEditor;
