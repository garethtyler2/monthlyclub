import { redirect } from 'next/navigation';

export default function StepOneRedirect() {
  redirect('/create-a-business');
}