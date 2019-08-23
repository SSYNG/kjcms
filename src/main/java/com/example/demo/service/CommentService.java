package com.example.demo.service;

import java.util.List;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Comment;
import com.example.demo.repository.CommentRepository;

@Service
public class CommentService {
	@Autowired
	CommentRepository CommentRepository;
	@Resource
	private CommentRepository commentRepository;

@Transactional
public Comment save(Comment comment) {

	return commentRepository.save(comment);
}
@Transactional
public Comment findBycommentid(Integer commentid) {

	return commentRepository.findById(commentid).get();
}
//@Transactional
//public List<Article> findByauthor(String author) {
//
//	return articleRepository.findByAuthor(author);
//}
@Transactional
public List<Comment> findAll() {
	
	return commentRepository.findAll();

}
@Transactional
public void deleteBycommentid(int commentid) {
	commentRepository.deleteById(commentid);
}


}
