package com.hj.phiau.service.impl;

import com.hj.phiau.repository.XuRepository;
import com.hj.phiau.repository.entity.Xu;
import com.hj.phiau.service.IXuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author zhenbiao.cai
 * @date 2018/6/10 13:23
 */
@Service
@Transactional
public class XuServiceImpl implements IXuService {

    @Autowired
    private XuRepository xuRepository;

    @Override
    public List<Xu> findAll() {
        return xuRepository.findAll();
    }

    @Override
    public void saveXu(Xu xu) {
        xuRepository.save(xu);
    }

    @Override
    public void deleteXu(Xu xu) {
        xuRepository.delete(xu);
    }

    @Override
    public void deleteAll() {
        xuRepository.deleteAll();
    }
}
