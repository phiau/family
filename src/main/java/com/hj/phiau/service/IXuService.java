package com.hj.phiau.service;

import com.hj.phiau.repository.entity.Xu;

import java.util.List;

/**
 * @author zhenbiao.cai
 * @date 2018/6/10 13:18
 */
public interface IXuService {

    List<Xu> findAll();

    void saveXu(Xu xu);

    void deleteXu(Xu xu);

}
