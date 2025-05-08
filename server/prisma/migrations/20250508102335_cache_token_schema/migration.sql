-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "is_valid" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE INDEX "sessions_is_valid_idx" ON "sessions"("is_valid");
