-- CreateTable
CREATE TABLE "Account" (
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SmartAccount" (
    "address" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorAccountAddress" TEXT NOT NULL,

    CONSTRAINT "SmartAccount_pkey" PRIMARY KEY ("address")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_address_key" ON "Account"("address");

-- AddForeignKey
ALTER TABLE "SmartAccount" ADD CONSTRAINT "SmartAccount_authorAccountAddress_fkey" FOREIGN KEY ("authorAccountAddress") REFERENCES "Account"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
