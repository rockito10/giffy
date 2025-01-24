-- CreateTable
CREATE TABLE "custom_gif" (
    "gif_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" BYTEA NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "custom_gif_pkey" PRIMARY KEY ("gif_id")
);
