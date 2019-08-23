package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Role;
import com.example.demo.repository.RoleRepository;
@Service
public class RoleService {
	@Autowired
RoleRepository roleRepository;
  public void addRole(Role role) {
	  roleRepository.save(role);
	// TODO Auto-generated method stub
  }
  public Role findById(int roleid) {
	  return roleRepository.findByRoleid(roleid);
}
  public List<Role> findAll() {
	  return roleRepository.findAll();
	}
}
