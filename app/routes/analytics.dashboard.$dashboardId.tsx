import {
  QuickSightClient,
} from "@aws-sdk/client-quicksight"
import { fromIni } from "@aws-sdk/credential-providers"
import { LoaderFunction } from "@remix-run/cloudflare"

export const loader: LoaderFunction = async () => {
  new QuickSightClient({
    region: "us-east-1",
    credentials: fromIni({
      profile: "default",
    }),
  })
}

export default function Analytics() {
  return (
    <div>
    </div>
  )
}
