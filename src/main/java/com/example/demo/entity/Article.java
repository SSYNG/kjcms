package com.example.demo.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Article{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleid;
    private String title;
    private String content;
    private String img;    //图片名
    
    @ManyToOne
    @JoinColumn 
    private User user;
    
    @OneToMany(mappedBy="article")
    private List<Comment> comment;
    
    public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Long getArticleid() {
		return articleid;
	}

	public void setArticleid(Long articleid) {
		this.articleid = articleid;
	}


	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public Article(){}

    public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
