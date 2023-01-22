package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/leezhengjing/go_admin/controllers"
	"github.com/leezhengjing/go_admin/middlewares"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Use(middlewares.IsAuthenticated)

	app.Put("/api/users/info", controllers.UpdateInfo)
	app.Put("/api/users/password", controllers.UpdatePassword)

	app.Get("/api/user", controllers.User)
	app.Post("/api/logout", controllers.Logout)

	app.Get("/api/users", controllers.AllUsers)
	app.Post("/api/users", controllers.CreateUser)
	app.Get("/api/users/:id", controllers.GetUser)
	app.Put("/api/users/:id", controllers.UpdateUser)
	app.Delete("/api/users/:id", controllers.DeleteUser)

	app.Get("/api/roles", controllers.AllRoles)
	app.Post("/api/roles", controllers.CreateRole)
	app.Get("/api/roles/:id", controllers.GetRole)
	app.Put("/api/roles/:id", controllers.UpdateRole)
	app.Delete("/api/roles/:id", controllers.DeleteRole)

	app.Get("/api/permissions", controllers.AllPermissions)

	app.Get("/api/posts", controllers.AllPosts)
	app.Post("/api/posts", controllers.CreatePost)
	app.Get("/api/posts/:id", controllers.GetPost)
	app.Put("/api/posts/:id", controllers.UpdatePost)
	app.Delete("/api/posts/:id", controllers.DeletePost)
	app.Get("/api/posts/threads/:id", controllers.FilterPost)

	app.Post("/api/upload", controllers.Upload)
	app.Static("/api/uploads", "./uploads")

	app.Get("/api/orders", controllers.AllOrders)
	app.Post("/api/export", controllers.Export)

	app.Get("/api/comments", controllers.AllComments)
	app.Post("/api/comments", controllers.CreateComment)
	app.Get("/api/comments/:id", controllers.GetComment)
	app.Put("/api/comments/:id", controllers.UpdateComment)
	app.Delete("/api/comments/:id", controllers.DeleteComment)

	app.Get("/api/threads", controllers.AllThreads)
	app.Post("/api/threads", controllers.CreateThread)
	app.Get("/api/threads/:id", controllers.GetThread)
	app.Put("/api/threads/:id", controllers.UpdateThread)
	app.Delete("/api/threads/:id", controllers.DeleteThread)
}
