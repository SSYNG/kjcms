package com.example.demo.controller;


import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Article;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.ArticleRepository;
import com.example.demo.repository.CommentRepository;
import com.example.demo.service.CommentService;
import com.example.demo.service.RoleService;
import com.example.demo.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
	@Resource
	private UserService userService; 
	@Autowired
	ArticleRepository articleRepository;
	@Autowired
	CommentRepository commentRepository;
	@Autowired
	CommentService commentService;
	@Autowired
	RoleService roleService;                                       //权限服务实现注入

	@GetMapping("/reg")
	public String addHtml(Model model) {
		model.addAttribute("rolelist",roleService.findById(1));
		System.out.println(roleService.findById(1).getAuthority());
		return "/login.html"; 
	}

	// 普通用户注册
	@PostMapping("/reg")
	public String save(String username, String password, String email,int roleid) {
		if (registerUser(username) == true) {
			User user1 = new User();
			user1.setUsername(username);
			user1.setPassword(password); 
			user1.setEmail(email);
			Role role=roleService.findById(1);
			List<Role> roles=new ArrayList<Role>();
			roles.add(role);
			user1.setRoles(roles);
			userService.save(user1);
		} else {
			return "/tips/err";
		}
		return "login";
	}
	

	public Boolean registerUser(String username) { // 检测username重复禁止注册
		Boolean a = true;
		if (userService.findUserByName(username)==null) {
			return a;
		} else {
			return false;
		}
	} 
	 @PostMapping("/dosend")                      //评论发表方法
	   public String send( @RequestParam(value="content") String content,
			                 Model model,User user,Article article) {
	       Comment comment = new Comment();
	       comment.setUser(user);
	       comment.setArticle(article);
	       comment.setContent(content);
	       commentRepository.save(comment);
	           model.addAttribute("comment",commentService.findAll());
	           return "/tips/success";
	       } 
	 
	  @GetMapping(value="/pub")                            //发表文章相应地址
	    public String pub(Model model,int id){
	    	model.addAttribute("user",userService.findByid(id));
	        return "pub";
	    }
	     
	    @PostMapping(value="/pub")                          //发表具体方法
	    public String tijiao(
	    		             @RequestParam(value="title") String title,
	                         @RequestParam(value="content") String content,
	                         @RequestParam(value="file")MultipartFile file,
	                         Model model,User user) {
	        Article article = new Article();
	        article.setTitle(title);
	        article.setContent(content);
	        article.setUser(user);
	        
	        if (!file.isEmpty()) {
	            try {
	               
	            	file.transferTo(new File("d:\\360\\"+file.getOriginalFilename()));//指示保存路径
	                String filename=file.getOriginalFilename(); 
	                article.setImg("/"+filename);
	                articleRepository.save(article);    //保存文章
	            } catch (FileNotFoundException e) {     //未找到文件的异常
	                e.printStackTrace();
	                return "上传失败," + e.getMessage();
	            } catch (IOException e) {
	                e.printStackTrace();
	                return "上传失败," + e.getMessage();
	            }
	            model.addAttribute(article);            //添加回显model 
	            model.addAttribute("user",userService.findByid(user.getId()));
	            return "contentpage";
	        } else {
	            return "上传失败，因为文件是空的.";
	        }
	    }


	@RequestMapping("/login")
	public String login() {
		return "login";
	}

	/**
	 * 执行登录 普通用户
	 * 
	 * 
	 * 
	 */
	@RequestMapping("/dologin")
	public String login(HttpServletRequest request,Model model) {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		User user = userService.FindNameAndPsw(username, password);
		model.addAttribute("user",user);

		String str = "";
		if (user != null) {
			request.getSession().setAttribute("user", user);
			str = "index.html";
		} else {
			str = "login";
		}
		return str;
	}
	@RequestMapping("/index")                                        
	public String indexwithoutlogin(HttpServletRequest request,Model model) {
		String username = (String)request.getSession().getAttribute("username");
		User user = userService.findUserByName(username);
		model.addAttribute("user", user);
		return "index";
	}

}