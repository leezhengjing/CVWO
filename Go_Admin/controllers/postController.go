package controllers

import (
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/leezhengjing/go_admin/database"
	"github.com/leezhengjing/go_admin/models"
)

func AllPosts(c *fiber.Ctx) error {
	page, _ := strconv.Atoi(c.Query("page", "1"))

	return c.JSON(models.Paginate(database.DB, &models.Post{}, page, 0))
}

func CreatePost(c *fiber.Ctx) error {
	var product models.Post

	if err := c.BodyParser(&product); err != nil {
		return err
	}

	product.CreatedAt = time.Now().Format("02/01/2006 15:04:05")
	product.UpdatedAt = time.Now().Format("02/01/2006 15:04:05")

	database.DB.Create(&product)

	return c.JSON(product)
}

func GetPost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	post := models.Post{
		Id: uint(id),
	}

	database.DB.Find(&post)

	return c.JSON(post)
}

func UpdatePost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	post := models.Post{
		Id: uint(id),
	}

	if err := c.BodyParser(&post); err != nil {
		return err
	}

	post.UpdatedAt = time.Now().Format("02/01/2006 15:04:05")

	database.DB.Model(&post).Updates(post)

	return c.JSON(post)
}

func DeletePost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	post := models.Post{
		Id: uint(id),
	}

	database.DB.Delete(&post)

	return nil
}

func FilterPost(c *fiber.Ctx) error {

	// Paginated
	page, _ := strconv.Atoi(c.Query("page", "1"))

	id, _ := strconv.Atoi(c.Params("id"))

	return c.JSON(models.Paginate(database.DB, &models.Post{}, page, id))

}
