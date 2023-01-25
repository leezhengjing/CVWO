package database

import (
	"github.com/leezhengjing/go_admin/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	database, err := gorm.Open(mysql.Open("mysql:1ZIuU5Bevbza2RIOc5rtwHyQhsZj5L4x@tcp(mysql-jt0f:3306)/go_admin"), &gorm.Config{})

	if err != nil {
		panic("Could not connect to database")
	}

	DB = database

	database.AutoMigrate(
		&models.Thread{},
		&models.User{},
		&models.Role{},
		&models.Permission{},
		&models.Post{},
		&models.PostLike{},
		&models.Comment{},
		&models.CommentLike{},
		&models.Tag{})

}
