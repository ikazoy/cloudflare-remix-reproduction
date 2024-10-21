import {
  GetDashboardEmbedUrlCommand,
  QuickSightClient,
} from "@aws-sdk/client-quicksight"
import { fromIni } from "@aws-sdk/credential-providers"
import { json, LoaderFunction } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import QuickSightDashboard from "~/components/quicksight/dashboard"

export const loader: LoaderFunction = async ({ params }) => {
  const { dashboardId } = params

  if (!dashboardId) {
    throw new Response("Dashboard ID is required", { status: 400 })
  }

  const client = new QuickSightClient({
    region: "us-east-1",
    credentials: fromIni({
      profile: "default",
    }),
  })

  const command = new GetDashboardEmbedUrlCommand({
    AwsAccountId: "123456789012",
    DashboardId: dashboardId,
    IdentityType: "QUICKSIGHT",
    UserArn: "arn:aws:iam::123456789012:user/quicksight-user",
    SessionLifetimeInMinutes: 60,
    UndoRedoDisabled: false,
    ResetDisabled: false,
  })

  try {
    const response = await client.send(command)
    return json({ embedUrl: response.EmbedUrl })
  } catch (error) {
    console.error("Error generating embed URL:", error)
    throw new Response("Failed to generate embed URL", { status: 500 })
  }
}

export default function Analytics() {
  const { embedUrl } = useLoaderData() as { embedUrl: string }

  return (
    <div>
      <QuickSightDashboard embedUrl={embedUrl} />
    </div>
  )
}
