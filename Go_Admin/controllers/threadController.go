package controllers

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/leezhengjing/go_admin/database"
	"github.com/leezhengjing/go_admin/models"
)

func AllThreads(c *fiber.Ctx) error {
	// Paginated
	page, _ := strconv.Atoi(c.Query("page", "1"))

	return c.JSON(models.Paginate(database.DB, &models.Thread{}, page))
}

func CreateThread(c *fiber.Ctx) error {
	var thread models.Thread

	if err := c.BodyParser(&thread); err != nil {
		return err
	}

	database.DB.Create(&thread)

	return c.JSON(thread)
}

func GetThread(c *fiber.Ctx) error {
	// Getting the id from the url
	id, _ := strconv.Atoi(c.Params("id"))

	thread := models.Thread{
		Id: uint(id),
	}

	database.DB.Preload("Posts").Find(&thread)

	return c.JSON(thread)
}

func UpdateThread(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	thread := models.Thread{
		Id: uint(id),
	}

	if err := c.BodyParser(&thread); err != nil {
		return err
	}

	database.DB.Model(&thread).Updates(thread)

	return c.JSON(thread)
}

func DeleteThread(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	thread := models.Thread{
		Id: uint(id),
	}

	database.DB.Delete(&thread)

	return nil
}
