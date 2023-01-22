package models

import (
	"gorm.io/gorm"
)

type Comment struct {
	Id          uint          `json:"id"`
	UpdatedAt   string        `json:"updated_at"`
	CreatedAt   string        `json:"created_at"`
	Description string        `json:"description"`
	LikeCount   int           `json:"like_count"`
	Likes       []CommentLike `json:"comment_likes" gorm:"foreignKey:CommentId"`
	PostId      uint          `json:"post_id"`
	UserId      uint          `json:"user_id"`
}

type CommentLike struct {
	Id        uint `json:"id"`
	UserId    uint `json:"user_id"`
	User      User `json:"user" gorm:"foreignKey:UserId"`
	CommentId uint `json:"comment_id"`
}

// Required functions
func (comment *Comment) Count(db *gorm.DB) int64 {
	var total int64
	db.Model(&Comment{}).Count(&total)
	return total
}

func (comment *Comment) Take(db *gorm.DB, limit int, offset int, filter int) interface{} {
	var comments []Comment

	db.Offset(offset).Limit(limit).Find(&comments)

	return comments
}
