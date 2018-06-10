package com.hj.phiau.repository;

import com.hj.phiau.repository.entity.Account;
import org.springframework.data.repository.CrudRepository;

/**
 * @author zhenbiao.cai
 * @date 2018/6/10 12:41
 */
public interface AccountRepository extends CrudRepository<Account, Integer> {

    Account findByName(String name);
}
