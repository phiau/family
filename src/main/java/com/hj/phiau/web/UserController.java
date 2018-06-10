package com.hj.phiau.web;

import com.hj.phiau.repository.entity.Account;
import com.hj.phiau.repository.entity.Node;
import com.hj.phiau.repository.entity.Xu;
import com.hj.phiau.service.IAccountService;
import com.hj.phiau.service.INodeService;
import com.hj.phiau.service.IXuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author zhenbiao.cai
 * @date 2018/6/10 12:18
 */
@RestController
public class UserController {

    @Autowired
    private IAccountService accountService;
    @Autowired
    private IXuService xuService;
    @Autowired
    private INodeService nodeService;

//    @RequestMapping(value = "/login")
//    public Account login(String name) {
//        Account account = accountService.findByName(name);
//        return account;
//    }

    @RequestMapping(value = "/xu")
    public List<Xu> xu() {
        return xuService.findAll();
    }

    @RequestMapping(value = "/s/node")
    public void saveNode(Node node) {
        nodeService.saveNode(node);
    }

}
