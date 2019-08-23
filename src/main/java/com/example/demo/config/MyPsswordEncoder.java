package com.example.demo.config;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
@Component
public class MyPsswordEncoder implements PasswordEncoder {

	@Override
	public String encode(CharSequence arg0) {
		// TODO Auto-generated method stub
		return arg0.toString();
	}

	@Override
	public boolean matches(CharSequence arg0, String arg1) {
		// TODO Auto-generated method stub
		return arg1.equals(arg0.toString());
	}

}
