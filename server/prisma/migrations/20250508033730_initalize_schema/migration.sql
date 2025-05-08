/*
  Warnings:

  - The values [Pending,Approved,Rejected,Paid] on the enum `affiliate_status_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [PENDING,COMPLETED,FAILED] on the enum `ai_interaction_status_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [CHAT,QUIZ,EXERCISE,FEEDBACK] on the enum `ai_interaction_type_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [Post,Product,Task] on the enum `comment_parent_type_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [Private,Group] on the enum `conversation_type_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [BEGINNER,INTERMEDIATE,ADVANCED] on the enum `course_level_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [DRAFT,PUBLISHED,ARCHIVED] on the enum `course_status_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [ACTIVE,COMPLETED,CANCELLED] on the enum `enrollment_status_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [Post,Comment,Product] on the enum `like_target_type_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [Text,Image,File,System] on the enum `message_type_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [Pending,Processing,Pickup,Dispatched,PackageArrived,OutForDelivery,Delivered,Cancelled,Returned] on the enum `order_status_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [Pending,Paid,Failed,Refunded] on the enum `payment_status_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [Social,Blog] on the enum `post_type_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [NOT_STARTED,IN_PROGRESS,COMPLETED] on the enum `progress_status_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [FREE,BASIC,PREMIUM] on the enum `subscription_plan_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [ACTIVE,CANCELLED,EXPIRED] on the enum `subscription_status_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [Low,Medium,High,Urgent] on the enum `task_priority_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [ToDo,InProgress,Done,Cancelled] on the enum `task_status_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [ADMIN,INSTRUCTOR,USER] on the enum `user_role_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [ACTIVE,INACTIVE,SUSPENDED] on the enum `user_status_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [Public,Followers,Private] on the enum `visibility_enum` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `street_address` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `click_source` on the `affiliate_stats` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "affiliate_status_enum_new" AS ENUM ('pending', 'approved', 'rejected', 'paid');
ALTER TABLE "affiliate_stats" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "affiliate_stats" ALTER COLUMN "status" TYPE "affiliate_status_enum_new" USING ("status"::text::"affiliate_status_enum_new");
ALTER TYPE "affiliate_status_enum" RENAME TO "affiliate_status_enum_old";
ALTER TYPE "affiliate_status_enum_new" RENAME TO "affiliate_status_enum";
DROP TYPE "affiliate_status_enum_old";
ALTER TABLE "affiliate_stats" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ai_interaction_status_enum_new" AS ENUM ('pending', 'completed', 'failed');
ALTER TABLE "ai_interactions" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ai_interactions" ALTER COLUMN "status" TYPE "ai_interaction_status_enum_new" USING ("status"::text::"ai_interaction_status_enum_new");
ALTER TYPE "ai_interaction_status_enum" RENAME TO "ai_interaction_status_enum_old";
ALTER TYPE "ai_interaction_status_enum_new" RENAME TO "ai_interaction_status_enum";
DROP TYPE "ai_interaction_status_enum_old";
ALTER TABLE "ai_interactions" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ai_interaction_type_enum_new" AS ENUM ('chat', 'quiz', 'exercise', 'feedback');
ALTER TABLE "ai_interactions" ALTER COLUMN "type" TYPE "ai_interaction_type_enum_new" USING ("type"::text::"ai_interaction_type_enum_new");
ALTER TYPE "ai_interaction_type_enum" RENAME TO "ai_interaction_type_enum_old";
ALTER TYPE "ai_interaction_type_enum_new" RENAME TO "ai_interaction_type_enum";
DROP TYPE "ai_interaction_type_enum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "comment_parent_type_enum_new" AS ENUM ('post', 'product', 'task');
ALTER TABLE "comments" ALTER COLUMN "parent_type" TYPE "comment_parent_type_enum_new" USING ("parent_type"::text::"comment_parent_type_enum_new");
ALTER TYPE "comment_parent_type_enum" RENAME TO "comment_parent_type_enum_old";
ALTER TYPE "comment_parent_type_enum_new" RENAME TO "comment_parent_type_enum";
DROP TYPE "comment_parent_type_enum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "conversation_type_enum_new" AS ENUM ('private', 'group');
ALTER TABLE "conversations" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "conversations" ALTER COLUMN "type" TYPE "conversation_type_enum_new" USING ("type"::text::"conversation_type_enum_new");
ALTER TYPE "conversation_type_enum" RENAME TO "conversation_type_enum_old";
ALTER TYPE "conversation_type_enum_new" RENAME TO "conversation_type_enum";
DROP TYPE "conversation_type_enum_old";
ALTER TABLE "conversations" ALTER COLUMN "type" SET DEFAULT 'private';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "course_level_enum_new" AS ENUM ('beginner', 'intermediate', 'advanced');
ALTER TABLE "courses" ALTER COLUMN "level" TYPE "course_level_enum_new" USING ("level"::text::"course_level_enum_new");
ALTER TYPE "course_level_enum" RENAME TO "course_level_enum_old";
ALTER TYPE "course_level_enum_new" RENAME TO "course_level_enum";
DROP TYPE "course_level_enum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "course_status_enum_new" AS ENUM ('draft', 'published', 'archived');
ALTER TABLE "courses" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "courses" ALTER COLUMN "status" TYPE "course_status_enum_new" USING ("status"::text::"course_status_enum_new");
ALTER TYPE "course_status_enum" RENAME TO "course_status_enum_old";
ALTER TYPE "course_status_enum_new" RENAME TO "course_status_enum";
DROP TYPE "course_status_enum_old";
ALTER TABLE "courses" ALTER COLUMN "status" SET DEFAULT 'draft';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "enrollment_status_enum_new" AS ENUM ('active', 'completed', 'cancelled');
ALTER TABLE "enrollments" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "enrollments" ALTER COLUMN "status" TYPE "enrollment_status_enum_new" USING ("status"::text::"enrollment_status_enum_new");
ALTER TYPE "enrollment_status_enum" RENAME TO "enrollment_status_enum_old";
ALTER TYPE "enrollment_status_enum_new" RENAME TO "enrollment_status_enum";
DROP TYPE "enrollment_status_enum_old";
ALTER TABLE "enrollments" ALTER COLUMN "status" SET DEFAULT 'active';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "like_target_type_enum_new" AS ENUM ('post', 'comment', 'product');
ALTER TABLE "likes" ALTER COLUMN "target_type" TYPE "like_target_type_enum_new" USING ("target_type"::text::"like_target_type_enum_new");
ALTER TYPE "like_target_type_enum" RENAME TO "like_target_type_enum_old";
ALTER TYPE "like_target_type_enum_new" RENAME TO "like_target_type_enum";
DROP TYPE "like_target_type_enum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "message_type_enum_new" AS ENUM ('text', 'image', 'file', 'system');
ALTER TABLE "messages" ALTER COLUMN "message_type" DROP DEFAULT;
ALTER TABLE "messages" ALTER COLUMN "message_type" TYPE "message_type_enum_new" USING ("message_type"::text::"message_type_enum_new");
ALTER TYPE "message_type_enum" RENAME TO "message_type_enum_old";
ALTER TYPE "message_type_enum_new" RENAME TO "message_type_enum";
DROP TYPE "message_type_enum_old";
ALTER TABLE "messages" ALTER COLUMN "message_type" SET DEFAULT 'text';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "order_status_enum_new" AS ENUM ('pending', 'processing', 'pickup', 'dispatched', 'packageArrived', 'outForDelivery', 'delivered', 'cancelled', 'returned');
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "order_status_history" ALTER COLUMN "status" TYPE "order_status_enum_new" USING ("status"::text::"order_status_enum_new");
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "order_status_enum_new" USING ("status"::text::"order_status_enum_new");
ALTER TYPE "order_status_enum" RENAME TO "order_status_enum_old";
ALTER TYPE "order_status_enum_new" RENAME TO "order_status_enum";
DROP TYPE "order_status_enum_old";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "payment_status_enum_new" AS ENUM ('pending', 'paid', 'failed', 'refunded');
ALTER TABLE "course_payments" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "payment_status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "payment_status" TYPE "payment_status_enum_new" USING ("payment_status"::text::"payment_status_enum_new");
ALTER TABLE "course_payments" ALTER COLUMN "status" TYPE "payment_status_enum_new" USING ("status"::text::"payment_status_enum_new");
ALTER TYPE "payment_status_enum" RENAME TO "payment_status_enum_old";
ALTER TYPE "payment_status_enum_new" RENAME TO "payment_status_enum";
DROP TYPE "payment_status_enum_old";
ALTER TABLE "course_payments" ALTER COLUMN "status" SET DEFAULT 'pending';
ALTER TABLE "orders" ALTER COLUMN "payment_status" SET DEFAULT 'pending';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "post_type_enum_new" AS ENUM ('social', 'blog');
ALTER TABLE "posts" ALTER COLUMN "post_type" DROP DEFAULT;
ALTER TABLE "posts" ALTER COLUMN "post_type" TYPE "post_type_enum_new" USING ("post_type"::text::"post_type_enum_new");
ALTER TYPE "post_type_enum" RENAME TO "post_type_enum_old";
ALTER TYPE "post_type_enum_new" RENAME TO "post_type_enum";
DROP TYPE "post_type_enum_old";
ALTER TABLE "posts" ALTER COLUMN "post_type" SET DEFAULT 'social';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "progress_status_enum_new" AS ENUM ('notStarted', 'inProgress', 'completed');
ALTER TABLE "progress" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "progress" ALTER COLUMN "status" TYPE "progress_status_enum_new" USING ("status"::text::"progress_status_enum_new");
ALTER TYPE "progress_status_enum" RENAME TO "progress_status_enum_old";
ALTER TYPE "progress_status_enum_new" RENAME TO "progress_status_enum";
DROP TYPE "progress_status_enum_old";
ALTER TABLE "progress" ALTER COLUMN "status" SET DEFAULT 'notStarted';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "subscription_plan_enum_new" AS ENUM ('free', 'basic', 'premium');
ALTER TABLE "subscriptions" ALTER COLUMN "plan" TYPE "subscription_plan_enum_new" USING ("plan"::text::"subscription_plan_enum_new");
ALTER TYPE "subscription_plan_enum" RENAME TO "subscription_plan_enum_old";
ALTER TYPE "subscription_plan_enum_new" RENAME TO "subscription_plan_enum";
DROP TYPE "subscription_plan_enum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "subscription_status_enum_new" AS ENUM ('active', 'cancelled', 'expired');
ALTER TABLE "subscriptions" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "subscriptions" ALTER COLUMN "status" TYPE "subscription_status_enum_new" USING ("status"::text::"subscription_status_enum_new");
ALTER TYPE "subscription_status_enum" RENAME TO "subscription_status_enum_old";
ALTER TYPE "subscription_status_enum_new" RENAME TO "subscription_status_enum";
DROP TYPE "subscription_status_enum_old";
ALTER TABLE "subscriptions" ALTER COLUMN "status" SET DEFAULT 'active';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "task_priority_enum_new" AS ENUM ('low', 'medium', 'high', 'urgent');
ALTER TABLE "tasks" ALTER COLUMN "priority" DROP DEFAULT;
ALTER TABLE "tasks" ALTER COLUMN "priority" TYPE "task_priority_enum_new" USING ("priority"::text::"task_priority_enum_new");
ALTER TYPE "task_priority_enum" RENAME TO "task_priority_enum_old";
ALTER TYPE "task_priority_enum_new" RENAME TO "task_priority_enum";
DROP TYPE "task_priority_enum_old";
ALTER TABLE "tasks" ALTER COLUMN "priority" SET DEFAULT 'medium';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "task_status_enum_new" AS ENUM ('toDo', 'inProgress', 'done', 'cancelled');
ALTER TABLE "tasks" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "tasks" ALTER COLUMN "status" TYPE "task_status_enum_new" USING ("status"::text::"task_status_enum_new");
ALTER TYPE "task_status_enum" RENAME TO "task_status_enum_old";
ALTER TYPE "task_status_enum_new" RENAME TO "task_status_enum";
DROP TYPE "task_status_enum_old";
ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT 'toDo';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "user_role_enum_new" AS ENUM ('admin', 'instructor', 'affiliate', 'user', 'buyer', 'seller', 'delivery', 'developer');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "user_role_enum_new" USING ("role"::text::"user_role_enum_new");
ALTER TYPE "user_role_enum" RENAME TO "user_role_enum_old";
ALTER TYPE "user_role_enum_new" RENAME TO "user_role_enum";
DROP TYPE "user_role_enum_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "user_status_enum_new" AS ENUM ('active', 'inactive', 'suspended');
ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "status" TYPE "user_status_enum_new" USING ("status"::text::"user_status_enum_new");
ALTER TYPE "user_status_enum" RENAME TO "user_status_enum_old";
ALTER TYPE "user_status_enum_new" RENAME TO "user_status_enum";
DROP TYPE "user_status_enum_old";
ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'active';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "visibility_enum_new" AS ENUM ('public', 'followers', 'private');
ALTER TABLE "posts" ALTER COLUMN "visibility" DROP DEFAULT;
ALTER TABLE "posts" ALTER COLUMN "visibility" TYPE "visibility_enum_new" USING ("visibility"::text::"visibility_enum_new");
ALTER TYPE "visibility_enum" RENAME TO "visibility_enum_old";
ALTER TYPE "visibility_enum_new" RENAME TO "visibility_enum";
DROP TYPE "visibility_enum_old";
ALTER TABLE "posts" ALTER COLUMN "visibility" SET DEFAULT 'public';
COMMIT;

-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_user_id_fkey";

-- DropForeignKey
ALTER TABLE "affiliate_stats" DROP CONSTRAINT "affiliate_stats_affiliate_user_id_fkey";

-- DropForeignKey
ALTER TABLE "affiliate_stats" DROP CONSTRAINT "affiliate_stats_associated_order_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_product_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_user_id_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_parent_category_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_parent_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "conversation_participants" DROP CONSTRAINT "conversation_participants_conversation_id_fkey";

-- DropForeignKey
ALTER TABLE "conversation_participants" DROP CONSTRAINT "conversation_participants_last_read_message_id_fkey";

-- DropForeignKey
ALTER TABLE "conversation_participants" DROP CONSTRAINT "conversation_participants_user_id_fkey";

-- DropForeignKey
ALTER TABLE "conversations" DROP CONSTRAINT "conversations_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "conversations" DROP CONSTRAINT "fk_conversations_last_message";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_following_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_conversation_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_actor_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_recipient_id_fkey";

-- DropForeignKey
ALTER TABLE "order_status_history" DROP CONSTRAINT "order_status_history_changed_by_user_id_fkey";

-- DropForeignKey
ALTER TABLE "order_status_history" DROP CONSTRAINT "order_status_history_order_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_affiliate_user_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_billing_address_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_delivery_person_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_shipping_address_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_fkey";

-- DropIndex
DROP INDEX "idx_affiliate_stats_associated_order_id";

-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "street_address" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "affiliate_stats" ALTER COLUMN "click_source" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "ai_interactions" ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "conversations" ALTER COLUMN "type" SET DEFAULT 'private',
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "course_payments" ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "status" SET DEFAULT 'draft';

-- AlterTable
ALTER TABLE "enrollments" ALTER COLUMN "status" SET DEFAULT 'active';

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "message_type" SET DEFAULT 'text';

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'pending',
ALTER COLUMN "payment_status" SET DEFAULT 'pending',
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "post_type" SET DEFAULT 'social',
ALTER COLUMN "visibility" SET DEFAULT 'public';

-- AlterTable
ALTER TABLE "progress" ALTER COLUMN "status" SET DEFAULT 'notStarted';

-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "status" SET DEFAULT 'active';

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT 'toDo',
ALTER COLUMN "priority" SET DEFAULT 'medium';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user',
ALTER COLUMN "status" SET DEFAULT 'active';

-- CreateIndex
CREATE INDEX "idx_addresses_default_shipping" ON "addresses"("is_default_shipping");

-- CreateIndex
CREATE INDEX "idx_addresses_default_billing" ON "addresses"("is_default_billing");

-- CreateIndex
CREATE INDEX "idx_affiliate_stats_status" ON "affiliate_stats"("status");

-- CreateIndex
CREATE INDEX "idx_affiliate_stats_created" ON "affiliate_stats"("created_at");

-- CreateIndex
CREATE INDEX "idx_cart_items_added" ON "cart_items"("added_at");

-- CreateIndex
CREATE INDEX "idx_categories_slug" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "idx_comments_created" ON "comments"("created_at");

-- CreateIndex
CREATE INDEX "idx_conversation_participants_joined" ON "conversation_participants"("joined_at");

-- CreateIndex
CREATE INDEX "idx_conversations_type" ON "conversations"("type");

-- CreateIndex
CREATE INDEX "idx_conversations_created" ON "conversations"("created_at");

-- CreateIndex
CREATE INDEX "idx_follows_created" ON "follows"("created_at");

-- CreateIndex
CREATE INDEX "idx_likes_created" ON "likes"("created_at");

-- CreateIndex
CREATE INDEX "idx_messages_created" ON "messages"("created_at");

-- CreateIndex
CREATE INDEX "idx_messages_type" ON "messages"("message_type");

-- CreateIndex
CREATE INDEX "idx_notifications_created" ON "notifications"("created_at");

-- CreateIndex
CREATE INDEX "idx_order_items_created" ON "order_items"("created_at");

-- CreateIndex
CREATE INDEX "idx_order_status_history_status" ON "order_status_history"("status");

-- CreateIndex
CREATE INDEX "idx_order_status_history_created" ON "order_status_history"("created_at");

-- CreateIndex
CREATE INDEX "idx_orders_payment_status" ON "orders"("payment_status");

-- CreateIndex
CREATE INDEX "idx_orders_created_at" ON "orders"("created_at");

-- CreateIndex
CREATE INDEX "idx_orders_code" ON "orders"("order_code");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_stats" ADD CONSTRAINT "affiliate_stats_affiliate_user_id_fkey" FOREIGN KEY ("affiliate_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_stats" ADD CONSTRAINT "affiliate_stats_associated_order_id_fkey" FOREIGN KEY ("associated_order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_category_id_fkey" FOREIGN KEY ("parent_category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_participants" ADD CONSTRAINT "conversation_participants_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_participants" ADD CONSTRAINT "conversation_participants_last_read_message_id_fkey" FOREIGN KEY ("last_read_message_id") REFERENCES "messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_participants" ADD CONSTRAINT "conversation_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_last_message_id_fkey" FOREIGN KEY ("last_message_id") REFERENCES "messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_status_history" ADD CONSTRAINT "order_status_history_changed_by_user_id_fkey" FOREIGN KEY ("changed_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_status_history" ADD CONSTRAINT "order_status_history_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_affiliate_user_id_fkey" FOREIGN KEY ("affiliate_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_billing_address_id_fkey" FOREIGN KEY ("billing_address_id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_delivery_person_id_fkey" FOREIGN KEY ("delivery_person_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipping_address_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "idx_addresses_user_id" RENAME TO "idx_addresses_user";

-- RenameIndex
ALTER INDEX "idx_affiliate_stats_affiliate_user_id" RENAME TO "idx_affiliate_stats_user";

-- RenameIndex
ALTER INDEX "idx_cart_items_user_id" RENAME TO "idx_cart_items_user";

-- RenameIndex
ALTER INDEX "idx_categories_parent_category_id" RENAME TO "idx_categories_parent";

-- RenameIndex
ALTER INDEX "idx_comments_parent_comment_id" RENAME TO "idx_comments_parent_comment";

-- RenameIndex
ALTER INDEX "idx_comments_user_id" RENAME TO "idx_comments_user";

-- RenameIndex
ALTER INDEX "idx_conversation_participants_user_id" RENAME TO "idx_conversation_participants_user";

-- RenameIndex
ALTER INDEX "idx_conversations_creator_id" RENAME TO "idx_conversations_creator";

-- RenameIndex
ALTER INDEX "idx_follows_following_id" RENAME TO "idx_follows_following";

-- RenameIndex
ALTER INDEX "idx_likes_user_id" RENAME TO "idx_likes_user";

-- RenameIndex
ALTER INDEX "idx_messages_conversation_id" RENAME TO "idx_messages_conversation";

-- RenameIndex
ALTER INDEX "idx_messages_sender_id" RENAME TO "idx_messages_sender";

-- RenameIndex
ALTER INDEX "idx_notifications_actor_id" RENAME TO "idx_notifications_actor";

-- RenameIndex
ALTER INDEX "idx_notifications_recipient_id_read_created" RENAME TO "idx_notifications_recipient_read_created";

-- RenameIndex
ALTER INDEX "order_items_order_id_idx" RENAME TO "idx_order_items_order";

-- RenameIndex
ALTER INDEX "order_items_product_id_idx" RENAME TO "idx_order_items_product";

-- RenameIndex
ALTER INDEX "idx_order_status_history_order_id" RENAME TO "idx_order_status_history_order";

-- RenameIndex
ALTER INDEX "idx_orders_affiliate_user_id" RENAME TO "idx_orders_affiliate";

-- RenameIndex
ALTER INDEX "idx_orders_delivery_person_id" RENAME TO "idx_orders_delivery";

-- RenameIndex
ALTER INDEX "idx_orders_user_id" RENAME TO "idx_orders_user";
