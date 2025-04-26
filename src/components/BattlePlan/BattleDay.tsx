
import React from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BattleDayProps {
  date: Date;
}

const BattleDay: React.FC<BattleDayProps> = ({ date }) => {
  const { toast } = useToast();
  const [plan, setPlan] = React.useState<any>(null);

  React.useEffect(() => {
    loadDailyPlan();
  }, [date]);

  const loadDailyPlan = async () => {
    const { data, error } = await supabase
      .from('daily_plans')
      .select('*')
      .eq('date', format(date, 'yyyy-MM-dd'))
      .maybeSingle();

    if (error) {
      toast({
        title: "Error loading plan",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setPlan(data || {
      main_goals: [],
      tasks: [],
      notes: "",
      mood: "",
      mood_comment: "",
      commanders_log: ""
    });
  };

  const savePlan = async (field: string, value: any) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const { error } = await supabase
      .from('daily_plans')
      .upsert({
        date: formattedDate,
        [field]: value,
        user_id: (await supabase.auth.getUser()).data.user?.id
      });

    if (error) {
      toast({
        title: "Error saving plan",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-vesper-navy/20 border-vesper-navy/30">
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-mono text-vesper-gold">
            {format(date, 'EEEE, MMMM d')}
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-vesper-teal">Main Goals (Top 3)</Label>
            <Textarea 
              placeholder="Enter your top 3 priorities..."
              value={plan?.main_goals || ''}
              onChange={(e) => {
                setPlan({ ...plan, main_goals: e.target.value });
                savePlan('main_goals', e.target.value);
              }}
              className="mt-2 bg-vesper-navy/10"
            />
          </div>

          <div>
            <Label className="text-vesper-teal">Commander's Log</Label>
            <Textarea 
              placeholder="Quick personal mission log..."
              value={plan?.commanders_log || ''}
              onChange={(e) => {
                setPlan({ ...plan, commanders_log: e.target.value });
                savePlan('commanders_log', e.target.value);
              }}
              className="mt-2 bg-vesper-navy/10"
            />
          </div>

          <div>
            <Label className="text-vesper-teal">Notes & Thoughts</Label>
            <Textarea 
              placeholder="Dump your thoughts here..."
              value={plan?.notes || ''}
              onChange={(e) => {
                setPlan({ ...plan, notes: e.target.value });
                savePlan('notes', e.target.value);
              }}
              className="mt-2 bg-vesper-navy/10"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BattleDay;
