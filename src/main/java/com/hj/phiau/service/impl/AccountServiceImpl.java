package com.hj.phiau.service.impl;

import com.hj.phiau.repository.AccountRepository;
import com.hj.phiau.repository.entity.Account;
import com.hj.phiau.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author zhenbiao.cai
 * @date 2018/6/10 12:50
 */
@Service
@Transactional
public class AccountServiceImpl implements IAccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account findByName(String name) {
        return accountRepository.findByName(name);
    }
}
