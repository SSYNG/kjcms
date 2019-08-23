package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.demo.entity.Article;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.ArticleRepository;
import com.example.demo.repository.CommentRepository;
import com.example.demo.service.ArticleService;
import com.example.demo.service.CommentService;
import com.example.demo.service.RoleService;
import com.example.demo.service.UserService;

@Controller
@RequestMapping("/admin")
public class AdminController {
	@Resource
	private ArticleService ArticleService;
	@Autowired
	private UserService userService;
	@Autowired
	ArticleRepository articleRepository;
	@Autowired
	CommentRepository commentRepository;
	@Autowired
	CommentService commentService;
	@Autowired
	RoleService roleService;

	@GetMapping("/articlelist") // 文章表视图
	public String ArticleListHtml(Model model) {
		model.addAttribute("articlelist", ArticleService.findAll());
		return "/manage/manage-article.html";
	}

	@GetMapping("/commentlist") // 评论表视图
	public String commentListHtml(Model model) {
		model.addAttribute("commentlist", commentService.findAll());
		return "/manage/manage-comment.html";
	}

	@GetMapping("/userlist") // 用户表视图
	public String userListHtml(Model model) {
		model.addAttribute("userlist", userService.findAll());
		model.addAttribute("rolelist", roleService.findAll());
		return "/manage/manage-user.html";

	}

	@GetMapping("/articledelete") // 删除文章
	public String delete(Model model, Long articleid) {

		ArticleService.deleteByarticleid(articleid);
		model.addAttribute("articlelist", ArticleService.findAll());
		return "redirect:/admin/articlelist";
	}

	@PostMapping("/commentdelete") // 删除评论
	public String delete(Model model, Integer commentid) {
		commentService.deleteBycommentid(commentid);
		model.addAttribute("commentlist", commentService.findAll());
		return "redirect:/admin/commentlist";
	}

	@PostMapping("/userdelete") // 删除用户
	public String delete(Model model, String id) {
		userService.deleteByid(Integer.parseInt(id));
		model.addAttribute("userlist", userService.findAll());
		return "redirect:/admin/userlist";
	}

	// 文章更新跳转
	@GetMapping("/articleupdate")
	private String update(Model model, Long articleid) {
		model.addAttribute("article", ArticleService.findByarticleid(articleid));

		return "/manage/updatearticle.html";
	}

	// 文章更新实现
	@PostMapping("/articleupdate")
	private String updatehtml(Model model, Long articleid, String author, String title, String content) {
		Article u = ArticleService.findByarticleid(articleid); // 根据id获取值到前端
		// u.setAuthor(author);
		u.setTitle(title);
		u.setContent(content);
		ArticleService.save(u);
		model.addAttribute("articlelist", ArticleService.findAll());

		return "redirect:/admin/articlelist";
	}

	@GetMapping("/userupdate")
	private String update(Model model, int id) {
		model.addAttribute("user", userService.findByid(id));
		model.addAttribute("rolelist",roleService.findAll());

		return "/manage/updateuser.html";
	}

	// 更新用户具体方法
	@PostMapping("/userupdate")
	private String updatehtml(Model model, int id, String username, String password, String email,int roleid) {
		User u = userService.findByid(id); // 获取id值到前端
		if (userService.findByusername(username).isEmpty()) { // 检测username是否存在,若不存在则创建新的
			u.setUsername(username);
			u.setPassword(password);
			u.setEmail(email);
			Role role = roleService.findById(roleid);             
			List<Role> roles = new ArrayList<Role>();
			roles.add(role);
			u.setRoles(roles);
			userService.save(u);
			model.addAttribute("userlist", userService.findAll());
			return "/manage/manage-user";
		} else {
			u.setPassword(password); // 若存在则写入新的密码和邮箱信息
			u.setEmail(email);
			Role role = roleService.findById(roleid);
			List<Role> roles = new ArrayList<Role>();
			roles.add(role);
			u.setRoles(roles);
			userService.save(u);
			model.addAttribute("userlist", userService.findAll());
		}
		return "/manage/manage-user.html";
	}

	@RequestMapping("/index")
	public String Adminlogin() {
		return "manage/manage-index.html";
	}

	/**
      管理员添加
       用户方法
	 * 
	 * }
	 */
	@PostMapping("/useradd")
	public String save1(String username, String password, String email,int roleid) {
		Role role=roleService.findById(roleid);
		if (registerUser(username) == true) {
			User user1 = new User();
			List<Role> roles=new ArrayList<Role>();
			roles.add(role);                    //赋权
			user1.setRoles(roles);
			user1.setUsername(username);
			user1.setPassword(password);
			user1.setEmail(email);
			userService.save(user1);
		/*	System.out.println(user1); 测试*/
			userService.save(user1);
		} else {
			return "err";
		}
		return "redirect:/admin/userlist";
	}

	public Boolean registerUser(String username) { // 检测username重复禁止添加
		Boolean a = true;
		if (userService.findUserByName(username)==null) {
			return a;
		} else {
			return false;
		}
	}

}
