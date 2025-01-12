-- CreateTable
CREATE TABLE "H4HSubmissions" (
    "id" STRING NOT NULL,
    "teamId" STRING NOT NULL,
    "githubUrl" STRING NOT NULL,
    "youtubeUrl" STRING NOT NULL,

    CONSTRAINT "H4HSubmissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PTCSubmissions" (
    "id" STRING NOT NULL,
    "teamId" STRING NOT NULL,
    "fileUrl" STRING NOT NULL,

    CONSTRAINT "PTCSubmissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "H4HSubmissions_teamId_key" ON "H4HSubmissions"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "PTCSubmissions_teamId_key" ON "PTCSubmissions"("teamId");
