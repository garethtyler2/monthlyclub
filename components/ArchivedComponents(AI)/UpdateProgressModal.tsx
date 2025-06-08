

'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';

interface UpdateProgressModalProps {
  open: boolean;
  onClose: () => void;
  complaintId: string;
}

export default function UpdateProgressModal({ open, onClose, complaintId }: UpdateProgressModalProps) {
  const [pain, setPain] = useState(5);
  const [mobility, setMobility] = useState(5);
  const [strength, setStrength] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from('complaint_progress_logs').insert({
      user_id: user.id,
      complaint_id: complaintId,
      pain_level: pain,
      strength_level: strength,
      mobility_level: mobility,
    });

    setIsSubmitting(false);
    if (!error) {
      onClose();
    } else {
      console.error('Failed to update progress:', error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Progress</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Pain Level</label>
            <Slider value={[pain]} onValueChange={(v) => setPain(v[0])} min={1} max={10} step={1} />
          </div>
          <div>
            <label className="block font-medium mb-1">Mobility Level</label>
            <Slider value={[mobility]} onValueChange={(v) => setMobility(v[0])} min={1} max={10} step={1} />
          </div>
          <div>
            <label className="block font-medium mb-1">Strength Level</label>
            <Slider value={[strength]} onValueChange={(v) => setStrength(v[0])} min={1} max={10} step={1} />
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full hero-button-primary mt-4">
          {isSubmitting ? 'Updating...' : 'Update'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}