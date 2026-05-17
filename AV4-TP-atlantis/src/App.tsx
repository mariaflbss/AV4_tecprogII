import NavBar from "./shared/components/NavBar";

export default function App() {
  return (
    <div className="flex min-h-screen bg-base-100">
      <NavBar />

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold">
          Dashboard Atlantis
        </h1>
      </main>
    </div>
  );
}