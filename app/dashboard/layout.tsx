import type {
  ReactNode,
} from "react";
import { redirect } from "next/navigation";

import SaasShell from "@/components/dashboard/saas-shell";
import {
  createClient,
} from "@/lib/supabase/server";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase =
    await createClient();

  const {
    data: {
      user,
    },
    error,
  } =
    await supabase.auth.getUser();

  if (error || !user) {
    redirect(
      "/login?next=/dashboard"
    );
  }

  return (
    <SaasShell>
      {children}
    </SaasShell>
  );
}