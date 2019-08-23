package com.example.demo.service;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Article;
import com.example.demo.repository.ArticleRepository;

@Service
public class ArticleService {
	@Autowired
	ArticleRepository ArticleRepository;
 
	@Resource
	private ArticleRepository articleRepository;

	@Transactional
	public Article save(Article article) {      //文章保存

		return articleRepository.save(article);
	}
	@Transactional
	public Article findByarticleid(Long articleid) {   //单个查询

		return articleRepository.findById(articleid).get();
	}
//	@Transactional
//	public List<Article> findByauthor(String author) {
//
//		return articleRepository.findByAuthor(author);
//	}
	@Transactional
	public Iterable<Article> findAll() {           //查所有
		
		return articleRepository.findAll();

	}
	@Transactional
	public void deleteByarticleid(Long articleid) {    //文章删单
		articleRepository.deleteById(articleid);
	}
	
	
}
