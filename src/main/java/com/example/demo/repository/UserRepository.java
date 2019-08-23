package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer>{
	 
		public User findByUsernameAndPassword(String username, String password);
	 
		public User findByUsername(String username);

}
