CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"slug" varchar(50) NOT NULL,
	"name" varchar(50) NOT NULL,
	"image" varchar(100) NOT NULL
);
