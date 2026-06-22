ALTER TABLE "user" ADD COLUMN "githubUsername" text;--> statement-breakpoint
CREATE UNIQUE INDEX "user_githubUsername_unique" ON "user" USING btree ("githubUsername");