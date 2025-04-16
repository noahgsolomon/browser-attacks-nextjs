import { DemoCookieSettings } from "./cards/cookie-settings";
import { DemoCreateAccount } from "./cards/create-account";
import { DemoGithub } from "./cards/github-card";
import { DemoNotifications } from "./cards/notifications";
import { DemoPaymentMethod } from "./cards/payment-method";
import { DemoReportAnIssue } from "./cards/report-an-issue";
import { DemoShareDocument } from "./cards/share-document";
import { DemoTeamMembers } from "./cards/team-members";
import { DemoStats } from "./cards/stats";
import { DemoChat } from "./cards/chat";
import { DemoFontShowcase } from "./cards/font-showcase";

function DemoCards() {
  return (
    <div className="flex flex-col gap-2 ">
      <DemoStats />
      <DemoCreateAccount />
      <DemoGithub />
      <DemoCookieSettings />
      <DemoTeamMembers />
      <DemoFontShowcase />
      <DemoReportAnIssue />
      <DemoPaymentMethod />
      <DemoShareDocument />
      <DemoNotifications />
      <DemoChat />
    </div>
  );
}

export default DemoCards;
