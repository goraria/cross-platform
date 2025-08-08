-- CreateEnum
CREATE TYPE "public"."verification_token_type_enum" AS ENUM ('email_verification', 'phone_verification', 'mfa_challenge', 'password_reset');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "email_verified_at" TIMESTAMPTZ(6),
ADD COLUMN     "mfa_enabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mfa_secret" VARCHAR(64),
ADD COLUMN     "phone_verified_at" TIMESTAMPTZ(6);

-- CreateTable
CREATE TABLE "public"."verification_tokens" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "token_hash" TEXT NOT NULL,
    "type" "public"."verification_token_type_enum" NOT NULL,
    "context" VARCHAR(50),
    "expires_at" TIMESTAMPTZ(6) NOT NULL,
    "consumed_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_verification_tokens_user" ON "public"."verification_tokens"("user_id");

-- CreateIndex
CREATE INDEX "idx_verification_tokens_type" ON "public"."verification_tokens"("type");

-- AddForeignKey
ALTER TABLE "public"."verification_tokens" ADD CONSTRAINT "verification_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
