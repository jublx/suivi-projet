/*
  Warnings:

  - You are about to drop the column `comment` on the `Task` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskId" INTEGER NOT NULL,
    CONSTRAINT "Comment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isImportant" BOOLEAN NOT NULL DEFAULT false,
    "isUrgent" BOOLEAN NOT NULL DEFAULT false,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "necessaryDays" INTEGER,
    "state" INTEGER NOT NULL DEFAULT 0,
    "blocking" BOOLEAN NOT NULL DEFAULT false,
    "additionnalNeeds" BOOLEAN NOT NULL DEFAULT false,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("additionnalNeeds", "blocking", "id", "isImportant", "isUrgent", "name", "necessaryDays", "projectId", "startDate", "state") SELECT "additionnalNeeds", "blocking", "id", "isImportant", "isUrgent", "name", "necessaryDays", "projectId", "startDate", "state" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
