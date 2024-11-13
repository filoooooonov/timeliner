import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = await createClient();
  const { data: companies } = await supabase.from("companies2").select();
  const { data: company_timelines } = await supabase
    .from("timeline_entries2")
    .select();

  return (
    <>
      <Hero />

      <div className="z-10 bg-background h-[50vh]"></div>
      {/* <pre>{JSON.stringify(companies, null, 3)}</pre>
      <pre>{JSON.stringify(company_timelines, null, 3)}</pre> */}
    </>
  );
}
