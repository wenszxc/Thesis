<?php

namespace Thesis\BulletinBundle\Entity;

/**
 * DepartmentRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class DepartmentRepository extends \Doctrine\ORM\EntityRepository {

    public function findAllSorted() {
        return $this->getEntityManager()
                        ->createQueryBuilder()
                        ->select('d')
                        ->from('ThesisBulletinBundle:Department', 'd')
                        ->orderBy('d.name', 'asc')
                        ->getQuery()
                        ->getResult()
        ;
    }

}
