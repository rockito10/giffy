-- CreateTable
CREATE TABLE "gif_interactions" (
    "gif_id" TEXT NOT NULL,
    "gif_likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "gif_interactions_pkey" PRIMARY KEY ("gif_id")
);

-- CreateTable
CREATE TABLE "gif" (
    "alt" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "tags" TEXT[],
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "gif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "liked" (
    "user_id" TEXT NOT NULL,
    "gif_id" TEXT NOT NULL,

    CONSTRAINT "liked_pkey" PRIMARY KEY ("user_id","gif_id")
);

-- CreateTable
CREATE TABLE "comment" (
    "comment_id" INTEGER NOT NULL,
    "gif_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "text" TEXT,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("gif_id","user_id","comment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_name_key" ON "user"("user_name");

-- AddForeignKey
ALTER TABLE "liked" ADD CONSTRAINT "liked_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked" ADD CONSTRAINT "liked_gif_id_fkey" FOREIGN KEY ("gif_id") REFERENCES "gif_interactions"("gif_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_gif_id_fkey" FOREIGN KEY ("gif_id") REFERENCES "gif_interactions"("gif_id") ON DELETE CASCADE ON UPDATE CASCADE;
