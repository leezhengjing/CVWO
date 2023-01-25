package controllers

import (
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/leezhengjing/go_admin/database"
	"github.com/leezhengjing/go_admin/models"
)

func AllComments(c *fiber.Ctx) error {
	// Paginated
	page, _ := strconv.Atoi(c.Query("page", "1"))

	return c.JSON(models.Paginate(database.DB, &models.Comment{}, page, 0))
}

func CreateComment(c *fiber.Ctx) error {
	var comment models.Comment

	if err := c.BodyParser(&comment); err != nil {
		return err
	}

	comment.CreatedAt = time.Now().Format("02/01/2006 15:04:05")
	comment.UpdatedAt = time.Now().Format("02/01/2006 15:04:05")

	database.DB.Create(&comment)

	return c.JSON(comment)
}

func GetComment(c *fiber.Ctx) error {
	// Getting the id from the url
	id, _ := strconv.Atoi(c.Params("id"))

	comment := models.Comment{
		Id: uint(id),
	}

	database.DB.Find(&comment)

	return c.JSON(comment)
}

func UpdateComment(c *fiber.Ctx) error {

	id, _ := strconv.Atoi(c.Params("id"))

	comment := models.Comment{
		Id: uint(id),
	}
	comment.UpdatedAt = time.Now().Format("02/01/2006 15:04:05")

	if err := c.BodyParser(&comment); err != nil {
		return err
	}

	database.DB.Model(&comment).Updates(comment)

	return c.JSON(comment)
}

func DeleteComment(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	comment := models.Comment{
		Id: uint(id),
	}

	database.DB.Delete(&comment)

	return nil
}
