package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository UserRepository;
 
	public User FindNameAndPsw(String username, String password) {
		return UserRepository.findByUsernameAndPassword(username, password);
		}
	@Resource
	private UserRepository userRepository;

	@Transactional
	public User save(User user) {                       //保存用户方法
		return userRepository.save(user);
	}
	@Transactional
	public User findByid(int id) {                       //根据id查找用户

		return userRepository.findById(id).get();
	}
	@Transactional
	public List<User> findByusername(String username) {
		List<User> users = new ArrayList<>();
		return users;
	}
	@Transactional
	public Iterable<User> findAll() {
		return userRepository.findAll();

	}
	@Transactional
	public void deleteByid(int id) {
		userRepository.deleteById(id);
	}
	@Transactional
	public User findUserByName(String username) {
		return userRepository.findByUsername(username);
	}
	
	
}
