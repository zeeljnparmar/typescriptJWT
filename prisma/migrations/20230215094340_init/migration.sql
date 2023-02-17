/*
  Warnings:

  - You are about to drop the `permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roleper` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userrole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."roleper" DROP CONSTRAINT "roleper_per_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."roleper" DROP CONSTRAINT "roleper_role_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."userrole" DROP CONSTRAINT "userrole_role_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."userrole" DROP CONSTRAINT "userrole_user_id_fkey";

-- DropTable
DROP TABLE "public"."permission";

-- DropTable
DROP TABLE "public"."role";

-- DropTable
DROP TABLE "public"."roleper";

-- DropTable
DROP TABLE "public"."user";

-- DropTable
DROP TABLE "public"."userrole";

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission" (
    "id" INTEGER NOT NULL,
    "module" TEXT NOT NULL,
    "sub_module" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userrole" (
    "userole_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "userrole_pkey" PRIMARY KEY ("userole_id")
);

-- CreateTable
CREATE TABLE "roleper" (
    "roleper_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "per_id" INTEGER NOT NULL,

    CONSTRAINT "roleper_pkey" PRIMARY KEY ("roleper_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "role_id_key" ON "role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "permission_id_key" ON "permission"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userrole_userole_id_key" ON "userrole"("userole_id");

-- CreateIndex
CREATE UNIQUE INDEX "roleper_roleper_id_key" ON "roleper"("roleper_id");

-- AddForeignKey
ALTER TABLE "userrole" ADD CONSTRAINT "userrole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userrole" ADD CONSTRAINT "userrole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roleper" ADD CONSTRAINT "roleper_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roleper" ADD CONSTRAINT "roleper_per_id_fkey" FOREIGN KEY ("per_id") REFERENCES "permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
