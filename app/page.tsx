export default function Home() {
  return (
    <main style={{ height: "100vh", margin: 0, overflow: "hidden" }}>
      <iframe
        src="/pixel-agents-engine/index.html"
        title="Hermes Office powered by Pixel Agents"
        style={{ border: 0, height: "100%", width: "100%" }}
      />
    </main>
  );
}

