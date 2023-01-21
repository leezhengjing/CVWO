package models

import "gorm.io/gorm"

type Post struct {
	Id           uint       `json:"id"`
	Title        string     `json:"title"`
	Body         string     `json:"body"`
	Image        string     `json:"image"`
	LikeCount    int        `json:"like_count" gorm:"-"`
	CommentCount int        `json:"comment_count" gorm:"-"`
	UpdatedAt    string     `json:"updated_at"`
	CreatedAt    string     `json:"created_at"`
	UserId       uint       `json:"user_id"`                             //Users
	ThreadId     uint       `json:"thread_id"`                           //Threads
	Tags         []Tag      `json:"tags" gorm:"many2many:post_tags"`     //Tags
	Comments     []Comment  `json:"comments" gorm:"foreignKey:PostId"`   //Comments
	Likes        []PostLike `json:"post_likes" gorm:"foreignKey:PostId"` //Likes
}

type PostLike struct {
	Id     uint `json:"id"`
	UserId uint `json:"user_id"`
	User   User `json:"user" gorm:"foreignKey:UserId"`
	PostId uint `json:"post_id"`
}

// Required functions
func (post *Post) Count(db *gorm.DB) int64 {
	var total int64
	db.Model(&Post{}).Count(&total)
	return total
}

func (post *Post) Take(db *gorm.DB, limit int, offset int) interface{} {
	var posts []Post

	db.Offset(offset).Limit(limit).Find(&posts)

	// for i, _ := range posts {
	// 	posts[i].LikeCount = len(posts[i].Likes)
	// 	posts[i].CommentCount = len(posts[i].Comments)
	// }

	return posts
}
