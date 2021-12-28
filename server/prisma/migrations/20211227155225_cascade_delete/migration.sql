-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "teamId" INTEGER NOT NULL,
    CONSTRAINT "Project_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("id", "isArchived", "name", "teamId") SELECT "id", "isArchived", "name", "teamId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
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
    CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("additionnalNeeds", "blocking", "id", "isImportant", "isUrgent", "name", "necessaryDays", "projectId", "startDate", "state") SELECT "additionnalNeeds", "blocking", "id", "isImportant", "isUrgent", "name", "necessaryDays", "projectId", "startDate", "state" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
