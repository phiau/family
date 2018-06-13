package com.hj.phiau.web;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.hj.phiau.comm.BaseConstantCode;
import com.hj.phiau.repository.entity.Account;
import com.hj.phiau.repository.entity.Xu;
import com.hj.phiau.service.IAccountService;
import com.hj.phiau.service.IXuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author zhenbiao.cai
 * @date 2018/6/10 15:00
 */
@Controller
public class HomeController {

    @Autowired
    private IXuService xuService;
    @Autowired
    private IAccountService accountService;

    @RequestMapping("/")
    public String index(HashMap<String, Object> map) {
        map.put("hello", "欢迎进入HTML页面");
        return "login";
    }

    @RequestMapping(value = "{name}")
    public String page(@PathVariable String name) {
        return name;
    }

    @RequestMapping("/doLogin")
    @ResponseBody
    public int doLogin(Account a, HttpSession session) {
        session.setAttribute("test", "you know");
        Account account = accountService.findByName(a.getName());
        if (null == account) {
            return BaseConstantCode.ACCOUNT_NOT_EXIST;
        }
        if (!account.getPsw().equals(a.getPsw())) {
            return BaseConstantCode.PASSWORD_INCORRECT;
        }
        return BaseConstantCode.OK;
    }

    @RequestMapping("save/tree")
    @ResponseBody
    public int saveTree(String tree, HttpSession session) {
        System.out.println(true);
        return BaseConstantCode.OK;
    }

    @RequestMapping("get/tree")
    @ResponseBody
    public String getTree() {
        return "kkkk";
    }

    @RequestMapping("save/xu")
    @ResponseBody
    public int saveXuList(String xuList, HttpSession session) {
        List<String> list = new Gson().fromJson(xuList, new TypeToken<List<String>>(){}.getType());
        xuService.deleteAll();
        for (int i = 0; i < list.size(); i++) {
            xuService.saveXu(new Xu(i+1, list.get(i)));
        }
        return BaseConstantCode.OK;
    }

    @RequestMapping("get/xu")
    @ResponseBody
    public String getXuList() {
        List<Xu> list = xuService.findAll();
        if (null == list || 0 >= list.size()) return "";
        return new Gson().toJson(list.stream().map(Xu::getXu).collect(Collectors.toList()));
    }
}
