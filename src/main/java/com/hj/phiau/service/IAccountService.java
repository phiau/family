package com.hj.phiau.service;


import com.hj.phiau.repository.entity.Account;

/**
 * @author zhenbiao.cai
 * @date 2018/6/10 12:49
 */
public interface IAccountService {

    public Account findByName(String name);
}
