-- CreateTable
CREATE TABLE "public"."verification_email_logs" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "email" VARCHAR(255) NOT NULL,
    "ip_address" VARCHAR(45),
    "user_agent" VARCHAR(255),
    "status" VARCHAR(30) NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_email_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_verif_email_logs_email" ON "public"."verification_email_logs"("email");

-- CreateIndex
CREATE INDEX "idx_verif_email_logs_created" ON "public"."verification_email_logs"("created_at");

-- AddForeignKey
ALTER TABLE "public"."verification_email_logs" ADD CONSTRAINT "verification_email_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
