-- AlterTable
ALTER TABLE "public"."sessions" ADD COLUMN     "ip_address" VARCHAR(45),
ADD COLUMN     "last_accessed_at" TIMESTAMPTZ(6),
ADD COLUMN     "refresh_token_hash" TEXT,
ADD COLUMN     "replaced_by_session_id" UUID,
ADD COLUMN     "revoked_at" TIMESTAMPTZ(6),
ADD COLUMN     "user_agent" VARCHAR(255);

-- CreateIndex
CREATE INDEX "idx_sessions_user_valid" ON "public"."sessions"("user_id", "is_valid");
