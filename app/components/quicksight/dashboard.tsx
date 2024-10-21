import { createEmbeddingContext } from "amazon-quicksight-embedding-sdk"
import { useEffect } from "react"

export default function QuickSightDashboard({
  embedUrl,
}: {
  embedUrl?: string
}) {
  useEffect(() => {
    if (!embedUrl) return

    const embedQuickSightDashboard = async () => {
      const { embedDashboard } = await createEmbeddingContext()
      const containerDiv = document.getElementById("embeddingContainer")

      while (containerDiv?.firstChild) {
        containerDiv.removeChild(containerDiv.firstChild)
      }

      await embedDashboard({
        url: embedUrl,
        container: containerDiv!,
        height: "600px",
        width: "100%",
        resizeHeightOnSizeChangedEvent: true,
      })
    }

    embedQuickSightDashboard()

    return () => {
      const containerDiv = document.getElementById("embeddingContainer")
      while (containerDiv?.firstChild) {
        containerDiv.removeChild(containerDiv.firstChild)
      }
    }
  }, [embedUrl])

  return <div id="embeddingContainer"></div>
}
