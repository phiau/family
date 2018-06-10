package com.hj.phiau.web;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.hj.phiau.repository.entity.Account;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

/**
 * @author zhenbiao.cai
 * @date 2018/6/10 15:00
 */
@Controller
public class HomeController {

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
        return 200;
    }

    @RequestMapping("save/xu")
    @ResponseBody
    public int saveXuList(String xuList, HttpSession session) {
        System.out.println("--- " + session.getAttribute("test"));
        List<String> list = new Gson().fromJson(xuList, new TypeToken<List<String>>(){}.getType());
        System.out.println("size : " + list);
        list.stream().forEach(System.out::println);
        return 200;
    }
}
