package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/leezhengjing/go_admin/database"
	"github.com/leezhengjing/go_admin/models"
)

func AllPermissions(c *fiber.Ctx) error {
	var permissions []models.Permission

	database.DB.Find(&permissions)

	return c.JSON(permissions)
}
