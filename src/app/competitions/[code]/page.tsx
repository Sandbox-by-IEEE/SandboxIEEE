export default async function CompetitionDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Competition: {code.toUpperCase()}
        </h1>
        <p className="text-gray-600">Coming Soon - Under Reconstruction</p>
      </div>
    </div>
  );
}
